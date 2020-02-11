import styled from "styled-components"

export default styled.div`
  box-sizing: border-box;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  padding: 40px;
  text-align: center;
  background: #b9b9b9;
  

  .date {
    background-color: #393939;
    padding: 15px;
    border-radius: 8px;
    text-align: left;
    color: #ffffff;
    

    .date__input {
      border: 0;
      outline: none;
      padding: 15px;
      font-size: 16px;
      font-weight: 700;
      border-radius: 8px;
      color: #000000;
    }
  }

  .schedule {
    list-style: none;
    margin: 0;
    padding: 0;
    color: white;
    text-align: left;

    &__network {
      &:nth-child(even) {
        background: #696969;
        &:hover {
    background: #c9c9c9;
    color: red;
  }
      }

      &:nth-child(odd) {
        background: #898989;
        &:hover {
    background: #c9c9c9;
    color: red;
  }
      }
    }

    &__shows {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
`