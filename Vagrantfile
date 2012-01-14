Vagrant::Config.run do |config|
  config.vm.box = "ubuntu_10.04"  
  config.vm.forward_port "http", 80, 8080
  #config.vm.box_url = "http://dl.dropbox.com/u/2761766/vagrant%20boxes/ubuntu_10.04.box"
  config.vm.box_url = "../../../ubuntu_10.04.box"

  # Boot with a GUI so you can see the screen. (Default is headless)
  # config.vm.boot_mode = :gui

  # Assign this VM to a host only network IP, allowing you to access it
  # via the IP.
  # config.vm.network "33.33.33.10"

  # Share an additional folder to the guest VM. The first argument is
  # an identifier, the second is the path on the guest to mount the
  # folder, and the third is the path on the host to the actual folder.
  # config.vm.share_folder "v-data", "/vagrant_data", "../data"
end
