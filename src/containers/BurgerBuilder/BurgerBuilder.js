import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  meat: 1.3,
  cheese: 0.4,
  salad: 0.5,
  bacon:0.7
}
class BurgerBuilder extends Component {

  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon:0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1
    }
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: ( this.state.ingredients[type] - 1  > 0 ? this.state.ingredients[type] - 1 : 0) 
    }
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    })
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey]
      })
      .reduce((sum, el) => {
        return sum+ el 
      }, 0)
      
    this.setState({purchaseable: sum> 0})
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert("You continued!")
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    console.log("disInfo", disabledInfo)

    // const disabledInfo = this.state.ingredients.map(ingredient => ingredient > 0? true: false)
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredientSummary={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable= {this.state.purchaseable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}

        />
      </Aux>
    )
  }
}

export default BurgerBuilder;