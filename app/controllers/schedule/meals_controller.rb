class Schedule::MealsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @meals = current_user.scheduled_meals.includes(:meal).order(:position)
  end

  def show
    @meal = current_user.scheduled_meals.includes(:meal).find(params[:id])
  end

  def create
    @meal = current_user.scheduled_meals.build(scheduled_meal_params)
    @meal.meal = current_user.meals.find(params[:meal][:id])
    @meal.save

    render template: 'schedule/meals/show'
  end

  def update
    @meal = current_user.scheduled_meals.update(scheduled_meal_params)

    render template: 'schedule/meals/show'
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
