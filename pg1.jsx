React apps are made out of components. A component is a piece
of the UI (user interface) that has its own
logic and appearance. A component 
be as small as a button, or as large as an entire page.

React components are JavaScript functions that return markup:

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

Now that you've declared MyButton, you can nest it into another component:

export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton />
      </div>
    );
}

Notice that <MyButton /> starts with a capital letter. That’s how you know it’s a
React component. React component names must always start with a capital letter,
while HTML tags must be lowercase.

function MyButton() {
    return (
      <button>
        I'm a button
      </button>
    );
  }
  
  export default function MyApp() {
    return (
      <div>
        <h1>Welcome to my app</h1>
        <MyButton />
      </div>
    );
  }

JSX is stricter than HTML. You have to close tags like <br />. Your component 
also can't return multiple JSX tags. You have to wrap them into a shared parent,
like a <div>...</div> or an empty <>...</> wrapper:

In React, you specify a CSS class with className. It works the same way 
as the HTML class attribute:

<img className="avatar" />
Then you write the CSS rules for it in a separate CSS file:

/* In your CSS */
.avatar {
  border-radius: 50%;
}

JSX lets you put markup into JavaScript. Curly braces let you “escape back” 
into JavaScript so that you can embed some variable from your code and display'
it to the user. For example, this will display user.name:

return (
  <h1>
    {user.name}
  </h1>
);

return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);

You can put more complex expressions inside the JSX curly braces too, for 
example, string concatenation:

//user is js object
const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };
  
  export default function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className="avatar"
          src={user.imageUrl}
          alt={'Photo of' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize
          }}
        />
      </>
    );
  }
  In the above example, style={{}} is not a special syntax, but a regular 
  {} object inside the style={ } JSX curly braces. You can use the style 
  attribute when your styles depend on JavaScript variables.


In React, there is no special syntax for writing conditions. Instead, you’ll use
the same techniques as you use when writing regular JavaScript code. For example,
you can use an if statement to conditionally include JSX:

let content;
  if (isLoggedIn) {
    content = <AdminPanel />;
  } else {
    content = <LoginForm />;
  }
  return (
    <div>
      {content}
    </div>
  );


If you prefer more compact code, you can use the conditional ? operator.
Unlike if, it works inside JSX:

<div>
{isLoggedIn ? 
(<AdminPanel />) :
(<LoginForm />)}
</div>

<div>
    {isLoggedIn && <AdminPanel />}
</div>

You will rely on JavaScript features like for loop and the array map() 
function to render lists of components.

For example, let's say you have an array of products:

const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

Inside your component, use the map() function to transform an array of products
into an array of <li> items:

    const listItems = products.map(product =>
      <li key={product.id}>
        {product.title}
      </li>
    );
    
    return (
      <ul>{listItems}</ul>
    );

Notice how <li> has a key attribute. For each item in a list, you should pass a string 
or a number that uniquely identifies that item among its siblings. Usually, a key should
be coming from your data, such as a database ID. React will rely on your keys to understand
what happened if you later insert, delete, or reorder the items.  


const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  //listitems-array of li items
  const listItems = products.map(product =>
    <li key={product.id}
      style={{
      color: product.isFruit ? 'magenta' : 'darkgreen'
      }}>
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}


You can respond to events by declaring event handler 
functions inside your components:

function MyButton() 
{
  function handleClick() 
  {  alert('You clicked me!');}

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

Often, you'll want your component to “remember” some information and display it. For
example, maybe you want to count the number of times a button is clicked. To do this, 
add state to your component.



import { useState } from 'react';
Now you can declare a state variable inside your component:

function MyButton() {
  const [count, setCount] = useState(0);
}

You will get two things from useState: the current state (count), and the function that lets
 you update it (setCount). You can give them any names, but the convention is to call them 
 like [something, setSomething].

The first time the button is displayed, count will be 0 because you passed 0 to useState(). 
When you want to change state, call setCount() and pass the new value to it. Clicking 
this button will increment the counter:


  function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

If you render the same component multiple times, each will 
get its own state. Try clicking each button separately:


import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

export default function MyApp() {
    return (
      <div>
        <h1>Counters that update separately</h1>
        <MyButton />
        <MyButton />
      </div>
    );
}

Sharing data between components 
In the previous example, each MyButton had its own independent count, and when 
each button was clicked, only the count for the button clicked changed:

However, often you’ll need components to share data and always update together.
To make both MyButton components display the same count and update together, you need to
move the state from the individual buttons “upwards” to the closest component containing
all of them.
In this example, it is MyApp
  















