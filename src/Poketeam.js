import {useState, useEffect} from 'react'
import axios from 'axios';


function PokeTeam  () {
    const [pokemon, setPokemon] = useState([]);
    const [boss, setBoss] = useState([]);
    const [getPokemon, setGetPokemon] = useState(false);
    const [getBoss, setGetBoss] = useState(false);

    const [name, setName] = useState("Your Leader")
    let [health, setHealth] = useState(0)
    const [maxHealth, setMaxHealth] = useState(0)
    const [firstType, setFirstType] = useState(null)
    const [secondType, setSecondType] = useState(null)
    const [attack, setAttack] = useState(0)
    const [defense, setDefense] = useState(0)
    const [specialAttack, setSpecialAttack] = useState(0)
    const [specialDefense, setSpecialDefense] = useState(0)
    const [speed, setSpeed] = useState(0)
    
    const [firstMove, setFirstMove] = useState (["Move"])
    const [secundMove, setSecundMove] = useState (["Move"])
    const [thirdMove, setThirdMove] = useState (["Move"])
    const [fourthMove, setFourthMove] = useState (["Move"])

    const [pokePlace, setPokePlace] = useState(0)
    // const [firstPokemon, setFirtsPokemon] = useState (0)
    const [selectedPokemonId, setSelectedPokemonId] = useState(null);

    const [getDeadPoke, setGetDeadPoke] = useState(false)
    const [deadPoke, setDeadPoke] = useState([])

    const [bossName, setBossName] = useState("Boss")
    let [bossHealth, setBossHealth] = useState(0)
    const [bossMaxHealth, setBossMaxHealth] = useState(0)
    const [BossFirstType, setBossFirstType] = useState(null)
    const [BossSecondType, setBossSecondType] = useState(null)
    const [bossAttack, setBossAttack] = useState(0)
    const [bossDefense, setBossDefense] = useState(0)
    const [bossSpecialAttack, setBossSpecialAttack] = useState(0)
    const [bossSpecialDefense, setBossSpecialDefense] = useState(0)
    const [bossSpeed, setBossSpeed] = useState(0)


    


    useEffect(() => {

        const fetchPokemons = async () => {
        try {
            const response = await axios.get('https://pokemon-battle-simulator-data.vercel.app/random');
            const listePok = [...pokemon, response.data]
            setPokemon(listePok);
            // console.log("poketaille",pokemon.length)
            setName (listePok[pokePlace][" Name"])
            setHealth (listePok[pokePlace]["HP"])
            setMaxHealth (listePok[pokePlace]["HP"])
            setFirstType (listePok[pokePlace]["Types"][0])
            setSecondType (listePok[pokePlace]["Types"][1])
            setAttack (listePok[pokePlace]["Attack"])
            setDefense (listePok[pokePlace]["Defense"])
            setSpecialAttack (listePok[pokePlace]["Special Attack"])
            setSpecialDefense (listePok[pokePlace]["Special Defense"])
            setSpeed (listePok[pokePlace]["Speed"])
            const listeMoves = listePok[pokePlace]["Moves"]
            setFirstMove (listeMoves[0])
            setSecundMove (listeMoves[Math.floor(Math.random()* listeMoves.length)])
            setThirdMove (listeMoves[Math.floor(Math.random()* listeMoves.length)])
            setFourthMove (listeMoves[Math.floor(Math.random()* listeMoves.length)])

            setGetPokemon(false)
            

        } catch (error) {
            console.log('Error:', error);
        } 
        };

        const fetchBoss = async () => {
        try{
            const response2 = await axios.get('https://pokemon-battle-simulator-data.vercel.app/random');
            const Bigboss = [...boss, response2.data]
            setBoss(Bigboss)
            setBossName (Bigboss[0][" Name"])
            setBossHealth (Bigboss[0]["HP"]+100)
            setBossMaxHealth (Bigboss[0]["HP"]+100)
            setBossFirstType (Bigboss[pokePlace]["Types"][0])
            setBossSecondType (Bigboss[pokePlace]["Types"][1])
            setBossAttack (Bigboss[0]["Attack"])
            setBossDefense (Bigboss[0]["Defense"])
            setBossSpecialAttack (Bigboss[0]["Special Attack"])
            setBossSpecialDefense (Bigboss[0]["Special Defense"])
            setBossSpeed (Bigboss[0]["Speed"])
            setGetBoss(false)
        } catch(error){
            console.log(error)
        }
    }
        const pokeDead = () => {
        try{
            const listDeadPoke = [...deadPoke, pokemon[0]]
            setDeadPoke(listDeadPoke)
            setGetDeadPoke(false)

        } catch(error){
            console.log(error)
        }
        }


    if  (getPokemon){
        fetchPokemons()
    };
    if  (getBoss){
        fetchBoss()
    };
    if  (getDeadPoke){
        pokeDead()
    };
  }, [getPokemon, getBoss, getDeadPoke]);


    const Teambuild = ()=> {

        if(pokemon.length<6){
            setGetPokemon(true)           
        }

        if(pokemon.length===5){
            console.log("Your team is ready !")          
        }
    }

    const GenerateBoss = ()=> {

        if(boss.length<1){
            setGetBoss(true)
            console.log("The boss is ready !")
        }
    }

    // const ConvertType = ()=> {



    // }

    const PutFirst = (table, pokemonID) => {
        // setSelectedPokemonId(pokemonID)
        //     table.splice(pokemonID)
        //     table.unshift(pokemonID)
        };
    


    const faster = () => {
        if (speed >= bossSpeed){
            console.log(name, " attack first !")
            PokeAttacking()
            if (bossHealth > 0){
                BossAttacking()
                } 
        } else {
            console.log(bossName, " attack first !")
            BossAttacking()
            if (health > 0){
                PokeAttacking()
            }
        }
    }
    
    const PokeAttacking = () => {
        if (pokemon.length===6 && boss.length===1){
                if (bossHealth > 0 && health > 0){
                    setBossHealth (bossHealth = bossHealth -10)
                    console.log(name, " inflicted 10 damage to ", bossName, " !")
                    if(bossHealth<0){ 
                        setBossHealth (0)
                        console.log(bossName," has fainted ! You won !")
                        }
                }
        }
        else {
            console.log("Complete your team and generate a boss first !")
        }

    }

    const BossAttacking = () => {

        if (pokemon.length===6 && boss.length===1){
            if(health>0 && bossHealth > 0){
                setHealth (health = health -20)
                console.log("The boss inflicted 20 damage to ", name, " !")
            } 

            if (health<=0){
                setHealth (0)
                console.log(name," has fainted ! Switch Pokemon !")
                // setPokePlace(pokePlace + 1)
                setGetDeadPoke(true)

                if (deadPoke.lenght === 6){
                    console.log ("Game over ! All your Pokemons are KO !")
                }
            }
        }else{
            console.log("Complete your team and generate a boss first !")
        }

    }

    return (
        <>
        <h1>Pokemon Battle Simulator</h1>
        <h2>Try to defeat a random Boss with a random team !</h2>
        <div id='container'>
            <div id='team'>
                <div>
                    <h3>{name}'s stats :</h3>
                    {health} HP
                    <div style = {{border: 'solid', backgroundColor:'#730800'}}>
                        <div
                        style={{
                        width: `${health/maxHealth *100}%`,
                        height: '30px',
                        backgroundColor: 'green',
                        }}
                        ></div>
                    </div>
                </div>
                
                <p>Types : <br/>{firstType}<br/>{secondType}<br/>Attack : {attack}<br/>Defense : {defense}<br/>Special Attack : {specialAttack}<br/>Special Defense : {specialDefense}<br/>Speed : {speed}</p>
                
                <div id='attacks'>
                    <button style={{width:'100px'}} onClick={faster}>{firstMove}</button>
                    <button style={{width:'100px'}} onClick={faster}>{secundMove}</button>
                    <button style={{width:'100px'}} onClick={faster}>{thirdMove}</button>
                    <button style={{width:'100px'}} onClick={faster}>{fourthMove}</button>
                </div>

                <button id='generation' onClick={Teambuild}>Add Poke</button>
                <p >Your Team :
                    {pokemon.map((poke, index) =><li key={index}>{index+1}.{poke[" Name"]}<button className='switch' onClick={PutFirst(pokemon, index)}>Switch Pokemon</button></li>)}
                </p>
            </div>
            

            <div id='boss'>
            <div>
                <h3>{bossName}'s stats :</h3>
                {bossHealth} HP
                    <div style = {{border : 'solid', backgroundColor:'#730800'}}>
                        <div
                        style={{
                        width: `${bossHealth/bossMaxHealth *100}%`,
                        height: '30px',
                        backgroundColor: 'green',
                        }}
                        ></div>
                    </div>
            </div>
                <p>Types : <br/>{BossFirstType}<br/>{BossSecondType}<br/>Attack : {bossAttack}<br/>Defense : {bossDefense}<br/>Special Attack : {bossSpecialAttack}<br/>Special Defense : {bossSpecialDefense}<br/>Speed : {bossSpeed}</p>
                <button id='generation' onClick={GenerateBoss}>Generate Boss</button>
            </div>

        </div>
        </> 
    )
}

export default PokeTeam
