class BeaconsController < ApplicationController
  # GET /beacons
  # GET /beacons.xml
  def index
    @beacons = Beacon.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @beacons }
      format.json { render :json => @beacons }
    end
  end
  
  # GET /beacons
  # GET /beacons.xml
  # GET /beacons.json
  def near
    loc = params[:location].split(',')
    @beacons = Beacon.recent.nearLat(Float(loc[0].gsub(':', '.'))).nearLong(Float(loc[1].gsub(':', '.')))
  
    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @beacons }
      format.json { render :json => @beacons }
    end
  end

  # POST /beacons
  # POST /beacons.xml
  def create
    @beacon = Beacon.new(params[:beacon])

    respond_to do |format|
      if @beacon.save
        flash[:notice] = 'Beacon was successfully created.'
        format.html { redirect_to(beacons_url) }
        format.xml  { render :xml => @beacon, :status => :created, :location => @beacon }
        format.json { render :json => @beacon, :status => :created, :location => @beacon }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @beacon.errors, :status => :unprocessable_entity }
        format.json { render :json => @beacon.errors, :status => :unprocessable_entity }
      end
    end
  end
end
