require 'uuidtools'

class ImagesController < ApplicationController

    def index

        render json: Image.all, status: :ok
    end

  def create
    # Get the uploaded file from the request parameters
    uploaded_file = params[:image]

    # Generate a UUID for the filename
    filename = UUIDTools::UUID.random_create.to_s

    # Save the file to the public/images directory
    File.open(Rails.root.join('public', 'images', filename), 'wb') do |file|
      file.write(uploaded_file.read)
    end

    # Create a new image record with the filename and URL
    image = Image.create!(filename: filename, image_url: "/images/#{filename}")

    # Render a JSON response with the created image record
    render json: image, status: :created
  end
end
