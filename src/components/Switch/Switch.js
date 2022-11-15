import Switch from "react-switch";
import { useState } from "react";
// import logo from "../../assets/Vinted_logo.png";

// import React, { Component } from "react";
// import Switch from "react-switch";

// class SwitchExample extends Component {
//   constructor() {
//     super();
//     this.state = { checked: false };
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(checked) {
//     this.setState({ checked });
//   }

//   render() {
//     return (
//       <label>
//         <span>Switch with default style</span>
//         <Switch onChange={this.handleChange} checked={this.state.checked} />
//       </label>
//     );
//   }
// }

const SwitchComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label>
      <Switch
        onChange={handleChange}
        checked={checked}
        // uncheckedIcon={<img src={logo} />}
        uncheckedIcon={<img src={"lol"} alt="lol" />}
      />
    </label>
  );
};

export default SwitchComponent;
