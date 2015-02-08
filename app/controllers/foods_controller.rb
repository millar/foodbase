class FoodsController < ApplicationController
  def index
    @foods = Food.order(id: :desc)

    if params[:name]
      @foods = @foods.where("name LIKE ?", "%#{params[:name]}%")
    end

    if params[:limit]
      @foods = @foods.limit(params[:limit])
    end

    respond_with @foods
  end

  def show
    @food = Food.find(params[:id])

    respond_with @food
  end
end
