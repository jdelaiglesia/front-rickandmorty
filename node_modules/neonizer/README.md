## Neonizer

**Neonizer** is a React component that adds vibrant neon color effects to text content. Easily integrate this component into your React applications to create eye-catching, dynamic text 
displays with customizable color transitions.

## Demo

![Neonizer Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjA1MWs0NTI0MHpjOHJhMjEzdHlzdHdocWZ2N3dvYzNtN2d2NjI1YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PasBZ2p7dQOLJ0uANd/giphy.gif)

## Installation

Install **neonizer** via npm:

```bash
npm install neonizer
```

### Usage

To use Neonizer in your React application, import the component and place it around the text you want to apply the neon effect to.

```javascript
import React from "react";
import Neonizer from "neonizer";

function App() {
  return (
    <div>
      <h1>Neonizer Example</h1>
      <Neonizer>New and vibrant text!</Neonizer>
    </div>
  );
}

export default App;
```

### Props

The Neonizer component accepts the following props:

- `children`: The text content to be styled with the neon effect.
- `className`: Additional CSS classes for styling.
- `time`: Time interval in milliseconds for color change (default: 2000ms).
- `excludeColors`: Colors to exclude from the random selection.
- `newColors`: Additional colors to include in the random selection.

### Base Colors

The default base colors available for the neon effect are:

- Neon Blue: `#1f51ff`
- Electric Cyan: `#0ff0fc`
- Neon Purple: `#bc13fe`
- Proton Purple: `#8a2be2`
- Neon Pink: `#ff44cc`
- Neon Magenta: `#ea00ff`
- Plastic Pink: `#ff1493`
- Neon Yellow: `#fff01f`
- Absinthe: `#e7ee4f`
- Chartreuse Yellow: `#dfff00`
- Neon Red: `#ff3131`
- Electric Orange: `#ff5e00`
- Neon Green: `#39ff14`
- UFO Green: `#7fff00`
- Electric Lime: `#ccff00`

Feel free to experiment with these colors or add your own to create stunning effects!

## License

This project is licensed under the [MIT License](LICENSE).
