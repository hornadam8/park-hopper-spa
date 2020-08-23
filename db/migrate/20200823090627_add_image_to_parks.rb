class AddImageToParks < ActiveRecord::Migration[6.0]
  def change
    add_column :parks, :image, :string
  end
end
