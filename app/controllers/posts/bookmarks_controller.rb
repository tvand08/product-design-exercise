module Posts
  class BookmarksController < ApplicationController
    before_action :set_post

    def create
      @bookmark = @post.bookmarks.create!

      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post }
      end
    end

    def destroy
      @post.bookmarks.destroy_all

      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to @post }
      end
    end

    def update
      # Given that this is a single user application, we can use first as we can safely assume it is the only
      @bookmark = Post.includes(:bookmarks).find(params[:post_id]).bookmarks.first

      @index = params[:position]
      if @index
        @bookmark.insert_at(@index.to_i)
      end

      @title = params[:bookmark_title]
      if @title
        @bookmark.update(title: @title)
      end

      respond_to do |format|
        format.turbo_stream
        format.any { head :ok }
      end
    end
    private

    def set_post
      @post = Post.find(params[:post_id])
    end
  end
end
