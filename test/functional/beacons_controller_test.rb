require 'test_helper'

class BeaconsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:beacons)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create beacon" do
    assert_difference('Beacon.count') do
      post :create, :beacon => { }
    end

    assert_redirected_to beacon_path(assigns(:beacon))
  end

  test "should show beacon" do
    get :show, :id => beacons(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => beacons(:one).to_param
    assert_response :success
  end

  test "should update beacon" do
    put :update, :id => beacons(:one).to_param, :beacon => { }
    assert_redirected_to beacon_path(assigns(:beacon))
  end

  test "should destroy beacon" do
    assert_difference('Beacon.count', -1) do
      delete :destroy, :id => beacons(:one).to_param
    end

    assert_redirected_to beacons_path
  end
end
