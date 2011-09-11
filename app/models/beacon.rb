class Beacon < ActiveRecord::Base
 	named_scope :recent, lambda { { :conditions => ['created_at > ?', Time.now.advance(:hours => -200)] } }
 	named_scope :user, lambda { |user| { :conditions => ['user = ?', user] } }
 	named_scope :nearLat, lambda { |lat| { :conditions => ['latitude between ? AND ?', lat-0.001, lat+0.001] } }
 	named_scope :nearLong, lambda { |long| { :conditions => ['longitude between ? AND ?', long-0.001, long+0.001] } }
end
