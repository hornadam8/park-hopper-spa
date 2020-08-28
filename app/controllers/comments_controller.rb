
class CommentsController < ApplicationController
  def index
    comments = Comment.all
    render json: comments, include:[:park]
  end

  def create
    comment = Comment.create(content: params[:content], park_id: params[:park_id])
    render json: comment
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.delete
  end
end
