class FoodsController < ApplicationController
  def index
    @foods = Food.all

    if params[:name]
      @foods = @foods.where("name LIKE ?", "%#{params[:name]}%")
    end

    respond_with @foods
  end

  def show
    @food = Food.find(params[:id])

    respond_with @food
  end
end
