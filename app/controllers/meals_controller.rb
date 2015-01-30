class MealsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @meals = Meal.active.where("public = ? or user_id = ?", true, current_user.id)
  end

  def show
    @meal = Meal.where("public = ? or user_id = ?", true, current_user.id).find(params[:id])
  end

  def create
    ingredients = []
    meal_params['ingredients'].each do |ingredient|
      food = ingredient['food']

      next if food.blank? or ingredient['amount'].blank?

      i = Ingredient.create(amount: ingredient['amount'])

      if food.is_a? String
         i.food = Food.find_or_create_by(name: food)
      else
        i.food = Food.find(food['id'])
      end

      ingredients << i
    end

    meal = current_user.meals.build
    meal.serves = meal_params['serves']
    meal.time = meal_params['time']
    meal.title = meal_params['title']
    meal.notes = meal_params['notes']
    meal.ingredients = ingredients
    meal.save

    respond_with meal, location: nil
  end

  def update
    @meal = current_user.meals.find(params[:id])

    ingredients = []
    meal_params['ingredients'].each do |ingredient|
      food = ingredient['food']

      next if food.blank? or ingredient['amount'].blank?

      i = Ingredient.create(amount: ingredient['amount'])

      if food.is_a? String
         i.food = Food.find_or_create_by(name: food)
      else
        i.food = Food.find(food['id'])
      end

      ingredients << i
    end

    @meal.serves = meal_params['serves']
    @meal.time = meal_params['time']
    @meal.title = meal_params['title']
    @meal.notes = meal_params['notes']
    @meal.ingredients = ingredients
    @meal.save

    respond_with @meal
  end

  def destroy
    @meal = current_user.meals.find(params[:id])
    @meal.active = false
    @meal.save

    head :no_content
  end

  def restore
    @meal = current_user.meals.find(params[:id])
    @meal.active = true
    @meal.save

    respond_with @meal
  end

  private

  def meal_params
    params.permit!.except(:action, :controller, :format, :meal)
  end
end
