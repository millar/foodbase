class CreateFood < ActiveRecord::Migration
  def change
    create_table :food do |t|
      t.string :name
      t.boolean :liquid, default: false
      t.decimal :wv_ratio
    end
  end
end
