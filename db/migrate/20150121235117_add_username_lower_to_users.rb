class AddUsernameLowerToUsers < ActiveRecord::Migration
  def change
    add_column :users, :username_lower, :string
    add_index :users, :username_lower, unique: true
  end
end
