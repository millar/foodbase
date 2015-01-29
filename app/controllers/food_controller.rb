class FoodController < ApplicationController
  def index
    @food = Food.all
    
    respond_with @food
  end
end
