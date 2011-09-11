class RemoveTimestampField < ActiveRecord::Migration
  def self.up
  	remove_column :beacons, :timestamp
  end

  def self.down
  	add_column :beacons, :timestamp, :datetime
  end
end
