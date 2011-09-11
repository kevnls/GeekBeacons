# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_GeekBeacons_session',
  :secret      => '3f10e7f26af3cf923c8268b66bad7718752c0128fb757ac84585051af4fcb2bb1694e8f64b1b002beda91208e5b1662ab79c79df4e57e183dc70cb93f749b350'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
