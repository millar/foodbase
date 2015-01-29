class AddPublicToMeals < ActiveRecord::Migration
  def change
    add_column :meals, :public, :boolean, default: false
  end
end
