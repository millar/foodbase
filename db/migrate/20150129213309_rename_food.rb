class RenameFood < ActiveRecord::Migration
  def change
    rename_table :food, :foods
  end
end
