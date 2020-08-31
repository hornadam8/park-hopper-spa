class AddLikeStatusToParks < ActiveRecord::Migration[6.0]
  def change
    add_column :parks,:like_status,:string,:default => '♡'
  end
end
