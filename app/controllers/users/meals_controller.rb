class Users::MealsController < ApplicationController
  def index
    if params[:user_id] == "me"
      user = current_user
    else
      user = User.find(params[:user_id])
    end

    @meals = Meal.active.where("public = ? or user_id = ?", true, user.id).includes(:user, :ingredients => [:food])

    if params[:name]
      @meals = @meals.where("title LIKE ?", "%#{params[:name]}%")
    end
  end
end
