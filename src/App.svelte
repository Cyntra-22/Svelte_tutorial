<!--<script>
   let count = 0
   function increment() {
      count += 1
   }

   $: {
      console.log('The count is ${count}')

      if (count >= 5){
         console.log('Restarting count')
         count = 0
      }
   }


</script>

<p>Clicked {count} {count === 1 ? 'time':'times'}</p>
<button on:click = {increment}>Click</button>
<button on:click = {() => count += 1}>Click</button>

########################################################## Reactivity #############################################

<script>
   let list = ['React', 'Vue']

   function handleClick(){
      list = [...list,'Svelte']
   }

   let items = [1,2,3,4]
   $: amount = items.length
   function addItem(){
      items = [...items,items.length + 1]
   }

   let album = [
      {track: 'Track 1', length: 180},
      {track: 'Track 2', length: 170},
      {track: 'Track 3', length: 190},
   ]

   $: albumLength = getAlbumLength(album)
   function getAlbumLength(album){
      let lengthSeconds = album.reduce(
         (totalLength, currentValue) => {
            return totalLength + currentValue.length
         },0)
      
      
      let [minutes,seconds] = (lengthSeconds/60).toFixed(2).toString().split('.')
      return {minutes,seconds}

   }

   function addTrack(){
      album = [...album,{track:'Track 4', length: 230}]
   }


</script>


<p>{list}</p>
<button on:click = {handleClick}>Add New</button>

<p>amount is {amount}</p>
<p>{items}</p>
<button on:click = {addItem}>Add Item</button>


<p>album length is {albumLength.minutes} minutes and {albumLength.seconds} seconds</p>
<button on:click = {addTrack}>Add Track</button>


#################################################### Proops ###########################################

export and {person.name}, {person.age}, {person.color}

<script>
  import Profile from './Profile.svelte';

   let person = {
      name: 'mppk',
      age: 23,
      color: 'white',
   }
</script>

<Profile {...person} randomly = "She is cool"/> 

##################################################### Logic ############################################

<script>
   let user = {
      loggedIn: false
   }

   function toggle(){
      user.loggedIn = !user.loggedIn
   }

   let todos = [
      {id: 1, text: 'To do 1', completed: true},
      {id: 2, text: 'To do 2', completed: false},
      {id: 3, text: 'To do 3', completed: false},
      {id: 4, text: 'To do 4', completed: false},

   ]

   async function fetchPokemon(pokemonName){
      let url = 'http://pokeapi.co/api/v2/pokemon/'
      let response = await fetch(`${url}${pokemonName}`)
      let {name, sprites } = await response.json()

      return {
         name, 
         image: sprites['front_default']
      }
   }


</script>

{#if user.loggedIn}
   <button on:click = {toggle}>Log out</button>
{/if}

{#if !user.loggedIn}
   <button on:click = {toggle}>Log in</button>
{/if}


   <ul>
      {#each todos as todo}
         <li>
            <input checked = {todo.completed} type="checkbox" />
            <span>{todo.text}</span>
         </li>
      {/each}
   
   </ul>

     <ul>
      {#each todos as {id, text,completed}}
         <li>
            <input checked = {completed} type="checkbox" />
            <span>{text}</span>
         </li>
      {/each}
   
   </ul>


   {#await fetchPokemon('pikachu')}
      <p>Fetchging Pokemon...</p>
   {:then pokemon}
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt = {pokemon.name}/>
   {:catch error}
      <p>Sth wrong {error.message}</p>
   {/await}

##################################################### Events ###########################################


<script>
	let m = { x: 0, y: 0 };
</script>

<div
	on:pointermove={(e) => {
		m = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer is at {m.x} x {m.y}
</div>

<style>
	div {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>


###################################### Binding #################################################

<script>
   let a = 1;
   let b = 2;
   let yes = false;

   let questions = [
      {id: 1, 
      text: "What is ur name?"},
      {id:2,
      text: "Where do you live?"},
      {id: 3,
      text: "What color do you like?"},
   ];
   let answer = '';
   let selected;

   function handleSubmit(){
      alert(`answerd question ${selected.id} (${selected.text}) with
      ${answer}`);
   }


   let scoops = 1;
   let flavours = [];

   const formatter = new Intl.ListFormat(
      'en', {style: 'long', type: 'conjuction'}
   );
 
</script>

<label>
<input type="number" bind:value= {a} min= 0 max=10/>
<input type="range" bind:value= {a} min= 0 max=10/>
</label>

<label>
<input type="number" bind:value= {b} min= 0 max=10/>
<input type="range" bind:value= {b} min= 0 max=10/>
</label>

<label>
   <input type = "checkbox" bind:checked = {yes}/>send me
</label>

{#if yes}
   <p>Thank you</p>
{:else}
   <p>You must opt to check</p>
{/if}

<button disabled = {!yes}>Subscribe</button>

<p>{a}+{b} = {a + b}</p>

<form on:submit|preventDefault = {handleSubmit}>
   <select 
      bind:value={selected} 
      on:change={() => (answer='')}>

   {#each questions as question}
      <option value = {question}>
      {question.text}</option>
   {/each}
   </select>
   <input type="text" bind:value = {answer} />
   <button disabled = {!answer} type="submit">Subscribe</button>

</form>

<p>Selected question {selected? selected.id: '[waiting...]'}</p>


<h2>Size</h2>

{#each [1,2,3] as number}
   <label>
      <input type="radio"
       name="scoops"
       value = {number}
       bind:group = {scoops} />
       {number} {number === 1 ? 'scoop': 'scoops'}
   </label>
{/each}

<h2>Flavours</h2>

{#each ['cookies','mint','ripple'] as flavour}
   <label>
      <input type="radio"
       name="flavours"
       value = {flavour}
       bind:group = {flavours} />
       {flavour}
   </label>
{/each}

{#if flavours.length === 0}
   <p>Please Select</p>
{:else if flavours.length > scoops}
   <p>Can't order</p>
{:else}
   <p>You ordered {scoops} {scoops === 1? 'scoop':'scoops'} of 
   {formatter.format(flavours)}</p>
{/if} 


<script>
	let scoops = 1;
	let flavours = [];
   import { marked } from 'marked';
	let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`;

	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>Flavours</h2>

<select multiple bind:value={flavours}>
   {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
      <option>{flavour}</option>
   {/each}
</select>

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}



<script>
	import { marked } from 'marked';
	let value = `Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`;
</script>

<div class="grid">
	input
	<textarea bind:value></textarea>

	output
	<div>{@html marked(value)}</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 5em 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1em;
		height: 100%;
	}

	textarea {
		flex: 1;
		resize: none;
	}
</style>

-->


<!--

##################################### component ##############################################

   Artist -------------- artistName
   Album  -------------- albumTitle, albumTracks
   AlbumTrack ---------- track, length, method - playing


<script>
   import Artist from './Artist.svelte'
   import Album from './Album.svelte'

   let artists = [
      {
         name: 'Jeon JK',
         albums: [
            {
               name: 'Seven',
               year: 2024,
               tracks: [
                  {title: 'seven', length: '3.32'},
                  {title: 'glass of tears', length: '3.32'},
                  {title: 'hate you', length: '3.32'},
                  {title: 'please dont change', length: '3.32'},
               ],
            },
         ],
      },
   ]
</script>

{#each artists as artist}
   <Artist artistName={artist.name} />
   {#each artist.albums as album}
      <Album 
         albumTitle = {album.name} 
         albumTracks = {album.tracks} />

   {/each}
{/each}

###################################### Slot ############################
<script>
   import Button from "./Button.svelte";
   import Profile from "./Profile.svelte";
  
</script>

<Button>
   <span slot="icon">💙</span>
   <span slot="text">Heart</span>
</Button>

<Button>
   <span slot="icon">💥</span>
   <span slot="text">Bomb</span>
</Button>


<Profile>
   <input type="text" />
   <input type="number"/>
</Profile>

<Button>
   <span slot="text">Submit</span>
</Button>

####################################################### Tranition #######################################################

<script>
   import {fade} from 'svelte/transition'
	let visible = true;
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:fade>
		Fades in and out
	</p>
{/if}

<script>
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = true;

	function spin(node, { duration }) {
		return {
			duration,
			css: (t) => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 * (1 - t))}%,
						${Math.min(50, 500 * (1 - t))}%
					);`;
			}
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<div
		class="centered"
		in:spin={{ duration: 8000 }}
		out:fade
	>
		<span>transitions!</span>
	</div>
{/if}

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}
</style>


<script>
	let visible = false;

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label>

{#if visible}
	<p transition:typewriter>
		The quick brown fox jumps over the lazy dog
	</p>
{/if}


################################################# Store ###############################################################

Writing, Reading and derived

 <script>
   import {message} from './store';

   function updateStore(){
      $message = "Bye"
   }

 </script>

 <p>{$message}</p>
 <button on:click={updateStore}>click</button> 


<script>
   import {name,greeting} from './store'
</script>

<h1>{$greeting}</h1>
<input bind:value = {$name}/>

<button on:click = {() => $name += '!'} > 
   Add ! mark
</button>

##################################### Local Storage ###############################
 

<script>
   import {localStorageStore} from './store';
   let message = localStorageStore('message', 'Hello')

   $message = 'Bye '
</script>
{$message}


###################################### Motion ##############################################################33


Tweening is like a smooth and steady movement, while a spring is more bouncy and elastic.
Tweening is good for gentle transitions, while springs are great for adding a bit of life and energy to animations.
<script>
	import {cubicOut} from 'svelte/easing';
   import {tweened} from 'svelte/motion';

	const progress = tweened(0, {
      duration: 400,
      easing: cubicOut
   }
);
   
</script>

<progress value={$progress} />

<button on:click={() => progress.set(0)}>
	0%
</button>

<button on:click={() => progress.set(0.25)}>
	25%
</button>

<button on:click={() => progress.set(0.5)}>
	50%
</button>

<button on:click={() => progress.set(0.75)}>
	75%
</button>

<button on:click={() => progress.set(1)}>
	100%
</button>

<style>
	progress {
		display: block;
		width: 100%;
	}
</style>


################################################# Action ##########################################################33

<script>
	import Canvas from './Canvas.svelte';
   import {trapFocus} from './action.js';

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];
	let selected = colors[0];
	let size = 10;

	let showMenu = true;
</script>

<div class="container">
	<Canvas color={selected} size={size} />

	{#if showMenu}
		<div
			class="modal-background"
			on:click|self={() => showMenu = false}
			on:keydown={(e) => {
				if (e.key === 'Escape') showMenu = false;
			}}
		>
			<div class="menu" use:trapFocus>
				<div class="colors">
					{#each colors as color}
						<button
							class="color"
							aria-label={color}
							aria-current={selected === color}
							style="--color: {color}"
							on:click={() => {
								selected = color;
							}}
						/>
					{/each}
				</div>

				<label>
					small
					<input type="range" bind:value={size} min="1" max="50" />
					large
				</label>
			</div>
		</div>
	{/if}

	<div class="controls">
		<button class="show-menu" on:click={() => showMenu = !showMenu}>
			{showMenu ? 'close' : 'menu'}
		</button>
	</div>
</div>

<style>
	.container {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.controls {
		position: absolute;
		left: 0;
		top: 0;
		padding: 1em;
	}

	.show-menu {
		width: 5em;
	}

	.modal-background {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}

	.menu {
		position: relative;
		background: var(--bg-2);
		width: calc(100% - 2em);
		max-width: 28em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
	}

	.colors {
		display: grid;
		align-items: center;
		grid-template-columns: repeat(9, 1fr);
		grid-gap: 0.5em;
	}

	.color {
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--color, #fff);
		transform: none;
		filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
		transition: all 0.1s;
	}

	.color[aria-current="true"] {
		transform: translate(1px, 1px);
		filter: none;
		box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
	}

	.menu label {
		display: flex;
		width: 100%;
		margin: 1em 0 0 0;
	}

	.menu input {
		flex: 1;
	}
</style>



<script>
   
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/themes/material.css';

	let content = 'Hello!';

	function tooltip(node,options) {
		const tooltip = tippy(node,options);

		return {
         update(options){
            tooltip.setProps(options);
         },
			destroy() {
				tooltip.destroy();
			}
		};
	}
</script>

<input bind:value={content} />

<button use:tooltip={{content, theme: 'material'}}>
	Hover me
</button>


###################################### Advanced Binding ####################################################3


<script>
	let todos = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
		todos = todos.concat({
			done: false,
			text: ''
		});
	}

	function clear() {
		todos = todos.filter((t) => !t.done);
	}

	$: remaining = todos.filter((t) => !t.done).length;
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class:done={todo.done}>
				<input
					type="checkbox"
					bind:checked={todo.done}
				/>

				<input
					type="text"
					placeholder="What needs to be done?"
					bind:value={todo.text}
				/>
			</li>
		{/each}
	</ul>

	<p>{remaining} remaining</p>

	<button on:click={add}>
		Add new
	</button>

	<button on:click={clear}>
		Clear completed
	</button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

	li {
		display: flex;
	}

	input[type="text"] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>




<script>
	let w;
	let h;
	let size = 42;
	let text = 'edit this text';
</script>

<label>
	<input type="range" bind:value={size} min="10" max="100" />
	font size ({size}px)
</label>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px" contenteditable>{text}</span>
	<span class="size">{w} x {h}px</span>
</div>

<style>
	div {
		position: relative;
		display: inline-block;
		padding: 0.5rem;
		background: hsla(15, 100%, 50%, 0.1);
		border: 1px solid hsl(15, 100%, 50%);
	}

	.size {
		position: absolute;
		right: -1px;
		bottom: -1.4em;
		line-height: 1;
		background: hsl(15, 100%, 50%);
		color: white;
		padding: 0.2em 0.5em;
		white-space: pre;
	}
</style>




<script>
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin
		? pin.replace(/\d(?!$)/g, '•')
		: 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${pin}`);
	}
</script>

<h1 style="opacity: {pin ? 1 : 0.4}">
	{view}
</h1>

<Keypad
	on:submit={handleSubmit}
   bind:value = {pin}
/>



<script>
	import Box from './Box.svelte';
</script>

<div class="boxes">
	<Box --color="green"/>
	<Box --color="purple"/>
	<Box --color="red"/>
</div>




<script>
	import Canvas from './Canvas.svelte';
	import Square from './Square.svelte';

	// we use a seeded random number generator to get consistent jitter
	let seed = 1;

	function random() {
		seed *= 16807;
		seed %= 2147483647;
		return (seed - 1) / 2147483646;
	}

	function jitter(amount) {
		return amount * (random() - 0.5);
	}
</script>

<div class="container">
	<Canvas width={800} height={1200}>
		{#each Array(12) as _, c}
			{#each Array(22) as _, r}
				<Square
					x={180 + c * 40 + jitter(r*2)}
					y={180 + r * 40 + jitter(r*2)}
					size={40}
					rotate={jitter(r*0.05)}
				/>
			{/each}
		{/each}
	</Canvas>
</div>

<style>
	.container {
		height: 100%;
		aspect-ratio: 2 / 3;
		margin: 0 auto;
		background: rgb(224, 219, 213);
		filter: drop-shadow(0.5em 0.5em 1em rgba(0, 0, 0, 0.1));
	}
</style>

##################################################### Basic Calculator ##############################################################

<script>
  

	let total = 0
	let console = ''
	let state = null

	function resolveState(){
		switch(state){
			case "add":
				total += parseFloat(console);
				console = 0;
				break;
			case "substract":
				total -= parseFloat(console);
				console = 0;
				break;
			case "multiply":
				total *= parseFloat(console);
				console = 0;
				break;
			case "division":
				total /= parseFloat(console);
				console = 0;
				break;
			default:
				total = parseFloat(console);
				console = 0;
				break;		
		}
	}

	function setOperation(operation){
		resolveState();
		state = operation;
	}
	function setValue(value){
		if(console.toString() == "0" || state == "equal"){
			console = " "
		}

		if (state == "equal"){
			state = null
		}
		if (value== "C"){
			total = 0;
			state = null;
			console = " ";
			return; 
		}

		console = console + value;
	
	}
	function equal(){
		resolveState();
		console = total ;
		state = "equal";

	}
</script>

<style>

	.calculator{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 300px;
		transform: translate(-50%,-50%);
		border: 2px soid #eee;
		box-shadow: 2px 2px 2px #ddd;
		padding: 10px;
	}
	.calculator input{

		width: 85%;
		padding: 20px;
		outline: none;
		text-align: right;
		font-size: 20px;
		margin-bottom: 10px;
		border: 1px solid rgb(184, 138, 170);
	}

	.calculator .buttons{
		display: flex;
		flex-wrap: wrap;
	}

	.calculator .buttons button {
		height: 40px;
		margin-bottom: 10px;
		background-color: pink;
		border: 1px solid rgb(184, 138, 170)
	}

	.calculator .buttons .operations{
		display: flex;
		justify-content: space-between;
		width: 100%;	
	}

	.calculator .buttons .operations button{
		width: 18%;
	}

	.calculator .buttons .numbers{
		width: 100%;	
	}

	.calculator .buttons .numbers > div{
		display: flex;
		justify-content: space-between;
	}

	.calculator .buttons .numbers > div button{
		width: 24%;
	}

</style>

<div class="calculator">
	<input type="text" bind:value = {console} readonly="true"/>
	<div class="buttons">
		<div class="operations">
			<button on:click={() => {setOperation('add');}}>
			+ </button>
			<button on:click={() => {setOperation('substract');}}>
			- </button>
			<button on:click={() => {setOperation('multiply');}}>
			* </button>
			<button on:click={() => {setOperation('division');}}>
			/ </button>
			<button on:click={equal}>
			= </button>

		</div>
		<div class="numbers">
			<div>
				<button on:click={() => {setValue(7);}}>
				7 </button>
				<button on:click={() => {setValue(8);}}>
				8 </button>
				<button on:click={() => {setValue(9);}}>
				9 </button>
				<button on:click={() => {setValue(0);}}>
				0 </button>
			</div>
			<div>
				<button on:click={() => {setValue(4);}}>
				4 </button>
				<button on:click={() => {setValue(5);}}>
				5 </button>
				<button on:click={() => {setValue(6);}}>
				6 </button>
				<button on:click={() => {setValue('.');}}>
				. </button>
			</div>
			<div>
				<button on:click={() => {setValue(1);}}>
				1 </button>
				<button on:click={() => {setValue(2);}}>
				2 </button>
				<button on:click={() => {setValue(3);}}>
				3 </button>
				<button on:click={() => {setValue('C');}}>
				C </button>
			</div>
		</div>
	</div>

</div>


########################################################### Tic Tac Toe ###########################################################



<script>
	let buttons = new Array(9).fill(null);
	let result = null;
	let turn = 'X';
	let winCombinations = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	function setValue(i){

		buttons[i] = turn;
		buttons = [...buttons];
		turn = turn === 'X'? 'O' : 'X';

		if(!buttons.includes(null)){
			result = "Match Draw";
		}
		else{
			checkWinner();
		}

	}

	function checkWinner(){

		for (let i=0;i<winCombinations.length;i++){
			if(buttons[winCombinations[i][0]] != null){
				if(buttons[winCombinations[i][0]] == buttons[winCombinations[i][1]] &&
				buttons[winCombinations[i][1]] == buttons[winCombinations[i][2]]
			){
				result = "Winner :" + buttons[winCombinations[i][0]];
				break;
			}
			}
			
		}
	}

	function restart(){
		buttons = new Array(9).fill(null);
		result = null;
		turn = 'X';
	}
</script>

<style>


	.tictac{
		width: 300px;
		height: 200px;
		display: flex;
		flex-wrap: wrap;
		
	}

	.layout{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}

	.tictac button{
		width: 100px;
		height: 100px;
		margin: 0px;
		border: 1px solid #bea0a0;
		background-color: antiquewhite;
	}
</style>


{#if !result}
	<div class="tictac layout">
		{#each buttons as button,i }
			<button on:click={() => {setValue(i)}}>
				{button? button: "" }
			</button>
		{/each}

	</div>

{:else}
	<div class="layout">
		{result}
	</div>
	<div>
		<button on:click={restart}>
		Restart 
		</button>
	</div>
{/if}


######################################################### FAQ ########################################################################



<script>
	
</script>

<style>

</style>

<div class="faq-main_body">
	<div class="faq-header">
		<img src="./images/logo.png" alt="faq header"/>
		<h1>FAQs</h1>
	</div>
	<div class="faq-container">
		<div class="faq-item">
			
		</div>
	</div>
</div> -->

<script>
  let faqItems = [
    { question: "What is Frontend Mentor, and how will it help me?", answer: "Frontend Mentor offers realistic coding challenges to help developers improve their frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.", isOpen: false },
    { question: "Is Frontend Mentor free?", answer: "Yes, Frontend Mentor offers both free and premium coding challenges, with the free option providing access to a range of projects suitable for all skill levels. ", isOpen: false },
    { question: "Can I use Frontend Mentor projects in my portfolio?", answer: "Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent way to showcase your skills to potential employers! ", isOpen: false },
	{ question: " How can I get help if I'm stuck on a Frontend Mentor challenge?", answer: "The best place to get help is inside Frontend Mentor's Discord community. There's a help channel where you can ask questions and seek support from other community members.", isOpen: false },
  ];
  const src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wallpaperflare.com%2Fsearch%3Fwallpaper%3Dpurple%2Blandscape&psig=AOvVaw2j8HnSoQQYbpDXdW2cVUcV&ust=1714155944777000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLjG-9P-3YUDFQAAAAAdAAAAABAE"

  function toggleAnswer(index) {
    faqItems[index].isOpen = !faqItems[index].isOpen;
  }
</script>

<style>

	:root{
		--bg_color: rgb(255, 239, 249)
	}

	:global(body){
		padding: 0;
		margin: 0;
		background-color: var(--bg_color);   	 
	}

	.image_background {
    	width: 100%;
		
    
}



	.main-container{
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: rgb(225, 161, 208);
		padding: 20px;
		border-radius: 10px;
		width: 50%;
		
	}

	button{
		background: none;
		border: none;
	}

	.faq-header{
		display: flex;
	}
	h1{
		margin: 0;
		padding: 0;
	}

	.alignment{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.faq-container{
		margin-top: 25px;
		padding-bottom: 10px;
		border-bottom: 1px solid rgb(169, 165, 165);
	}

	.faq-header img{
		width: 40px;
		height: 40px;
		padding-right: 10px;
	}

	.question-style{
		font-weight: bold;
		font-family:Georgia, 'Times New Roman', Times, serif;
		font-size: 15px;
	}

	@media (min-width: 1080px){
		.main-container{
			width: 30%;
		}
	}
	
</style>

<body>
	<div class="image_background">
		<img src="https://img.freepik.com/free-vector/matrix-style-binary-code-digital-falling-numbers-blue-background_1017-37387.jpg" alt=""/>
	</div>

	<div class="main-container">
		<div class="faq-header">
			<img src = "images/logo.png" alt="faq-title"/>
			<h1>FAQs</h1>
		</div>

		<div>
			{#each faqItems as faqItem, index}
				<div class="faq-container" style="{index === faqItems.length - 1 ? 'border-bottom: none;' : ''}">
					<div>
						<div class="alignment">
							<div class="question-style">
								<span>{faqItem.question}</span>
							</div>
							<div>
								<button on:click={() => toggleAnswer(index)}>
								{#if faqItem.isOpen}					
									<span>➖</span>
								{:else}
									<span>➕</span>
								{/if}
								</button>
							</div>
						</div>
					
						{#if faqItem.isOpen}
						<p>{faqItem.answer}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

</body>

	