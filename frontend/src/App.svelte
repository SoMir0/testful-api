<script>
  // imports
  import { onMount } from "svelte";

  // definitions
  const endpoint = 'http://localhost:8080/boards/';

  let boards = [];

  let newBoardText = '';

  let notifPos = '-4rem';
	$: cssVarStyles = `--notif-pos:${notifPos}`;
  
  let numOfNotifs = 0;

  // functions

  async function postBoard() {
    if (newBoardText == '') return;
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newBoardText})
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }

  async function deleteBoard(id) {
    fetch(endpoint+id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).catch(error => {
      console.error('There was an error!', error);
    });
    window.location = window.location;
  }

  async function updateBoard(id) {
    fetch(endpoint+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newBoardText })
    }).catch(error => {
      console.error('There was an error!', error);
    });
    window.location = window.location;
  }

  const copyText = (text) => {
    if(window.isSecureContext && navigator.clipboard)
      navigator.clipboard.writeText(text);
    else unsecuredCopyToClipboard(text);
    if (notifPos == '1rem') {
      numOfNotifs += 1;
      return;
    }
    notifPos = '1rem';
    setTimeout(function() {
      notifPos = '-4rem';
      numOfNotifs = 0;
    }, 3000);
  }

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }

  // on mount
  onMount(async function () {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      boards = data;
    } catch (err) {
      console.error(err);
    }
  });
</script>

<main style="{cssVarStyles}">
  <h1 class="title">On<mark>line clip</mark>boards!</h1>
  <form class="new" on:submit={postBoard}>
    <label for="newBoard">Add new board...</label>
    <input id="newBoard" type="text" bind:value={newBoardText} />
    <label for="subBtn"></label>
    <input type="submit" id="subBtn" value="Add" class="btn"/>
  </form>
  <div class="all">
    {#if boards.length==0}
      <p>No boards to show...</p>
    {:else}
      {#each boards as board}
        <article class="board" on:click={() => { copyText(board.content)}}>
          {board.content}
          <dt></dt>
          <button class="btn deleteBtn" on:click={() => {deleteBoard(board.id)}}>⤬</button>
          <button class="btn updateBtn" on:click={() => {updateBoard(board.id)}}>✎</button>
        </article>
      {/each}
    {/if}
  </div>
  <div class="notifications">
    <div class="notif">
      Copied! {#if numOfNotifs > 0}({numOfNotifs}){/if}
    </div>
  </div>
</main>

<style>
  :root {
    --back: #100720;
    --post: #31087B;
    --front: #eeeeee;
    --highlight: #FFC23C;
    --btnclr: #FA2FB5;
  }

  :global(body) {
    background: var(--back);
    color: var(--front);
    font-family: monospace, sans-serif;
  }

  ::selection {
    background: var(--highlight);
  }

  main {
    display: grid;
    grid-template-areas:
      "title"
      "new"
      "all";
    grid-template-rows: 15vh 30vh 1fr;
    grid-template-columns: 1fr;
    text-align: center;
    padding: 0 1rem;
  }

  mark {
    background: none; color: var(--highlight);
  }

  mark::selection {
    background: var(--front);
  }

  label {
    display: block;
    padding: 1rem 0;
  }

  #newBoard {
    width: 80%; outline: none; border: none;
    height: 2rem;
    font-size: 1.3rem;
    border-radius: 1rem 0;
    padding: 0.2rem;
  }

  #newBoard:focus {
    box-shadow: var(--front) 0 0 0.5rem;
  }

  #subBtn {
    background: var(--highlight);
    padding: 0.5rem 1rem;
    margin: 0;
    color: #eee;
    border-radius: 1rem 0;
  }

  #subBtn:hover {
    box-shadow: var(--highlight) 0 0 15px;
  }

  .btn {
    border: none; outline: none;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
    font-size: 1.5rem;
    border-radius: 1rem;
    transition: 200ms ease-in;
    background: var(--btnclr);
    cursor: pointer;
  }

  .btn:hover {
    box-shadow: var(--btnclr) 0 0 15px;
  }

  .board {
    margin-bottom: 1rem;
    background: var(--post);
    padding: 0.5rem;
    border-radius: 0 1rem;
    transition: 250ms;
    cursor: pointer;
    box-shadow: #0005 0.5rem 0.5rem 1rem;
  }

  .board:hover {
    transform: translatey(-0.5rem);
  }

  .title {
    grid-area: title;
  }

  .new {
    grid-area: new;
  }

  .all {
    grid-area: all;
  }

  .notif {
    position: fixed;
    background: var(--highlight);
    top: var(--notif-pos); right: 1rem;
    text-align: right;
    padding: 0.5rem; border-radius: 0.5rem;
    font-weight: bold; font-size: 1rem;
    transition: 250ms linear;
  }
  
  @media only screen and (max-height: 300px) {
    main {
      grid-template-rows: 25vh 60vh 1fr;
      grid-template-columns: 1fr;
    }
  }
</style>
