class CreateBeacons < ActiveRecord::Migration
  def self.up
    create_table :beacons do |t|
      t.string :user
      t.float :latitude
      t.float :longitude
      t.datetime :timestamp

      t.timestamps
    end
  end

  def self.down
    drop_table :beacons
  end
end
