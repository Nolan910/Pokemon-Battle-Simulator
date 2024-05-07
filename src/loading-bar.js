import {useState, useEffect} from 'react'


function LoadingBar (){
    let [remplissage, setRemplissage] = useState(0)


    const ClickPlus = () => {
        if (remplissage < 100) {
            setRemplissage(remplissage + 10)
        }
      };

    const ClickMoins = () => {
        setRemplissage(remplissage - 10);
        if (remplissage > 0) {
            setRemplissage(remplissage - 10)
        }
    };

//     useEffect(() => {
//         if (remplissage < 100){
//         const intervalId = setInterval(() => {
//         setRemplissage((prevRemplissage) => prevRemplissage + 10);        
//         }, 2000);
    
//         return () => clearInterval(intervalId);
// }});

    return(
        <>
            <div>
                <h1>Health : {remplissage}</h1>
                <div
                style={{
                width: `${remplissage}%`,//${(pointsDeVie / maxPointsDeVie) * 100}%
                height: '30px',
                backgroundColor: 'blue',
                }}
                ></div>
                <button onClick={ClickPlus}>+</button>
                <button onClick={ClickMoins}>-</button>
            </div>
        </>
    )
}

export default LoadingBar