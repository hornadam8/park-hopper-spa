class AddLikesToParks < ActiveRecord::Migration[6.0]
  def change
    add_column :parks, :likes, :integer, :default => 0
  end
end