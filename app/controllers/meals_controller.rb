class MealsController < ApplicationController
  def index
    @meals = Meal.where(public: true)
  end
end
