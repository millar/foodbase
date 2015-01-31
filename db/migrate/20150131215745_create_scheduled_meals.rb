class CreateScheduledMeals < ActiveRecord::Migration
  def change
    create_table :scheduled_meals do |t|
      t.integer :position, null: false
      t.date :date, null: false
      t.references :user
      t.references :meal
    end
  end
end
