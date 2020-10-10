import React, {Component} from 'react';
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import '../../styles/popup.css'
import tw from "twin.macro";

const Description = tw.p`mt-4 text-center md:text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

class Confirm extends Component {

    constructor(props){
      super(props)
    }
    render(){
        return(
            <div className='done_message'>
                <div className="response_message">
                {this.props.message}
                </div>
                <div className='popup_inner_lower_message'>
                    <PrimaryButtonBase onClick={this.props.handleClick} type="button">{this.props.buttonMessage}</PrimaryButtonBase>
                </div>
            </div>
        )
    }
}

export default Confirm;