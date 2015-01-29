class MealsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @meals = Meal.where("public = ? or user_id = ?", true, current_user.id)
  end

  def show
    @meal = Meal.where("public = ? or user_id = ?", true, current_user.id).find(params[:id])
  end

  def create
    ingredients = []
    meal_params['ingredients'].each do |ingredient|
      food = ingredient['food']

      next if food.blank? or ingredient['quantity'].blank?

      i = Ingredient.create(amount: ingredient['quantity'])

      if food.is_a? String
         i.food = Food.find_or_create_by(name: food)
      else
        i.food = Food.find(food['id'])
      end

      ingredients << i
    end

    meal = current_user.meals.build(meal_params.reject {|key| key == 'ingredients'})
    meal.ingredients = ingredients
    meal.save

    respond_with meal, location: nil
  end

  private

  def meal_params
    params.permit!.except(:action, :controller, :format, :meal)
  end
end
