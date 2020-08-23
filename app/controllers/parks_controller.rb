class ParksController < ApplicationController

  def index
    parks = Park.all
    render json: parks, except: [:information,:weather,:nearby_parks,:wildlife,:tours_and_camping,:link,:created_at,:updated_at]
  end
end
