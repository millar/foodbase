class AddCreatedAtToFoods < ActiveRecord::Migration
  def change
    add_column :foods, :created_at, :datetime
  end
end
