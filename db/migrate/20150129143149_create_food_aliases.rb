class CreateFoodAliases < ActiveRecord::Migration
  def change
    create_table :food_aliases do |t|
      t.string :name
      t.references :food
    end
  end
end
