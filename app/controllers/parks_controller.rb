require 'pry'
class ParksController < ApplicationController

  def index
    parks = Park.all
    render json: parks,include: [:comments], except: [:information,:weather,:nearby_parks,:wildlife,:tours_and_camping,:link,:created_at,:updated_at]
  end

  def update
    park = Park.find(params[:id])
    park.update(likes: params[:likes],like_status: params[:likeStatus])
    render json: park
  end

end
