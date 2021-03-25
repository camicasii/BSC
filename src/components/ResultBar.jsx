import React, {useEffect} from 'react'
import { useSelector,useDispatch} from "react-redux";

export default function ResultBar() {
    const game = useSelector(state => state.state.game)    
    useEffect(() => {
        const time = setTimeout(() => {
          var line1 = document.getElementById("Dice-line-1");
          var line2 = document.getElementById("Dice-line-2");
          let guess_ = game.guess;
          if (guess_ > 98) guess_ = 98;
          if (guess_ < 2) guess_ = 2;
          line1.style.backgroundColor = game.radioValue ? "red" : "aquamarine";
          line2.style.backgroundColor = game.radioValue ? "aquamarine" : "red";
          line1.style.width = `100%`;
          line2.style.width = `${guess_}%`;
        }, 300);
        return () => {
          clearTimeout(time);
        };
      },[game.guess,game.radioValue]);
    return (
        <div className="Dice-line relative">
            <div id="Dice-line-1" className="Dice-line-base Dice-line-1" />
            <div id="Dice-line-2" className="Dice-line-base Dice-line-2" />
          </div>
    )
}
