import 'dotenv/config'
import express from 'express'
import { Octokit } from "@octokit/core"
import wordwrap  from "wordwrap"
import request from 'superagent';
const {
    GIST_ID: gistId,
    GH_TOKEN: githubToken,
    GOOGLE_BOOKS_UID: googleBooksUID,
    GOOGLE_BOOKS_KEY: googleBooksKey,
} = process.env;
  
async function main() {
    const wrap = wordwrap(58);
  
    try{
        function delay() {
          return new Promise(function(resolve, reject) {
            setTimeout(function() {
              resolve(42);
            }, 1500);
          });
        }
        
        async function justRead() {
          try {
            var recent = await request.get(`https://www.googleapis.com/books/v1/users/${googleBooksUID}/bookshelves/4/volumes?&key=${googleBooksKey}`);
            await delay();
            return recent.body;
          } catch(error) {
            return null;
          }
        }

        async function currentlyRead() {
          try {
            var current = await request.get(`https://www.googleapis.com/books/v1/users/${googleBooksUID}/bookshelves/3/volumes?&key=${googleBooksKey}`);
            await delay();
            return current.body;
          } catch(error) {
            return null;
          }
        }

        (async function(){
          let justFinished = await justRead();
          let justFinishedTitle = justFinished.items[0].volumeInfo.title;
          let justFinishedauthor = justFinished.items[0].volumeInfo.authors;
          const justReadTitle = justFinishedTitle;
          const justReadAuthor = justFinishedauthor.toString();
          let currentReading = await currentlyRead();
          let currentReadingTitle = currentReading.items[0].volumeInfo.title;
          let currentReadingAuthor = currentReading.items[0].volumeInfo.authors;
          const currentTitle = currentReadingTitle;
          const currentAuthor = currentReadingAuthor.toString();
          console.log(justReadTitle);
          console.log(justReadAuthor);

        const currentlyReading = justReadTitle && justReadAuthor
            ? `Recently Finished: ${justReadTitle.split(':'[0])} \n By ${justReadAuthor}\n`
            : `I haven't read recently.\n`

        const recentlyRead = currentTitle && currentAuthor
          ? `Currently Reading: ${currentTitle.split(':')[0]} \nBy ${currentAuthor}`
          : `I am not reading anything at the moment.\n--------------------------------------`
        await updateGist([wrap(recentlyRead), wrap(currentlyReading)]);
        })();
    }catch(error){
        console.error(`Unable to fetch justFinished\n${error}`)
    }

}  


async function updateGist(readingStatus) {
  

  let gist;
  try {
    const octokit = new Octokit({
      auth: {githubToken}
    })
    
    gist = await octokit.request('GET /gists/{gist_id}', {
      gist_id: {gistId}
      
    }
    )
  } catch (error) {
    console.error(`Unable to get gist 1\n${error}`);
  }

  // Get original filename to update that same file
  const filename = Object.keys(gist.data.files)[0];

  // Only update if the content has changed
  if (gist.data.files[filename].content === readingStatus.join('\n')) {
    console.log(`Reading status hasn't changed; skipping update.`);
    return;
  }

  try {
    octokit.request('PATCH /gists/{gist_id}',{
      gist_id: {gistId},
      files: {
        [filename]: {
          filename,
          content: readingStatus.join('\n'),
        }
      }
    });
  } catch (error) {
    console.error(`Unable to update gist\n${error}`);
  }
}

(async () => {
await main();
})();
