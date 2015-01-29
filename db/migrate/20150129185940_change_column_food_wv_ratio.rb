class ChangeColumnFoodWvRatio < ActiveRecord::Migration
  def change
    change_column :food, :wv_ratio, :decimal, default: 1
  end
end
