import { useEffect, useState } from "react";
import axios from "axios";

function Api() {
  const [name, setName] = useState("");
  const [rec, setRec] = useState([]);
  const [data, setData] = useState([]);

  //This useeffect will render only once at the time site loads
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=salmon`)
      .then(function (response) {
        let meal = response.data.meals[0];
        console.log(meal);

        let receipe = [];

        for (let i = 0; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            receipe.push({
              ingredient: meal[`strIngredient${i}`],
              measure: meal[`strMeasure${i}`],
            });
          }
        }

        setRec(receipe);
        setData(meal);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //This useeffect will render only when the value of name changes(state Change)
  useEffect(() => {
    if (name) {
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(function (response) {
          let meal = response.data.meals[0];
          console.log(meal);

          let receipe = [];

          for (let i = 0; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              receipe.push({
                ingredient: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`],
              });
            }
          }

          setRec(receipe);
          setData(meal);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [name]);

  return (
    <div className="recipe">
      <input type="text" name="" id="item" placeholder="Search item" />
      <button onClick={() => {
          let item = document.getElementById("item").value;
          setName(item);
          document.getElementById("item").value = "";
        }}
      >Show Receipe</button>

      <h1 className="firsth1">How to make {data.strMeal}</h1>

        <div className="detpic">
          <div className="inst1" id="inst">
            <h4>
              <h2>{data.strMeal}</h2> <br />
              <h2>{data.strArea}</h2> <br />
              <h2>Ingredients</h2>
              {rec.map((element, elementNo) => (
                <li key={elementNo} className="li">
                  {`${element.measure} `}
                  {element.ingredient}
                </li>
              ))}
            </h4>
            <br />
            <h2>How to Make</h2>
            <p>{data.strInstructions}</p>
          </div>
          <div className="inst1 inst2">
            <img src={data.strMealThumb} className="image" alt="" />
          </div>
        </div>
      </div>
  );
}

export default Api;
