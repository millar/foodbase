class CreateIngredients < ActiveRecord::Migration
  def change
    create_table :ingredients do |t|
      t.decimal :quantity
      t.integer :unit

      t.references :meal
      t.references :food
      t.references :food_state
    end
  end
end
