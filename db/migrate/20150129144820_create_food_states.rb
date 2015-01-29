class CreateFoodStates < ActiveRecord::Migration
  def change
    create_table :food_states do |t|
      t.string :term
      t.string :description
    end
  end
end
