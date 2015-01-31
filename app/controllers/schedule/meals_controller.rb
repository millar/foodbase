class Schedule::MealsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @scheduled_meals = current_user.scheduled_meals
  end

  def show
    @scheduled_meal = current_user.scheduled_meals.find(params[:id])
  end

  def create
    meal = current_user.scheduled_meals.create(scheduled_meal_params)

    respond_with meal, location: nil
  end

  def update
    meal = current_user.scheduled_meals.update(scheduled_meal_params)

    respond_with meal
  end

  def destroy
    current_user.scheduled_meals.find(params[:id]).delete

    head :no_content
  end

  private

  def scheduled_meal_params
    params.permit(:date, :order, :scale_factor, :meal)
  end
end
