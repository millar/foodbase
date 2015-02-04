class ChangePosition < ActiveRecord::Migration
  def change
    change_column :scheduled_meals, :position, :integer, default: 0
  end
end
