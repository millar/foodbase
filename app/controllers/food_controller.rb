class FoodController < ApplicationController
  def index
    @food = Food.all

    if params[:name]
      @food = @food.where("name LIKE ?", "%#{params[:name]}%")
    end

    respond_with @food
  end
end
