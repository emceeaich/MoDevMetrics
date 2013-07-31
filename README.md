
Setup
=====

After cloning, you must ```git submodule init``` and ```git submodule update```.  Here is my full session:

**git clone https://github.com/klahnakoski/MoDevMetrics.git**
    
	Cloning into 'MoDevMetrics'...
	remote: Counting objects: 6563, done.
	remote: Compressing objects: 100% (3142/3142), done.
	remote: Total 6563 (delta 4485), reused 5226 (delta 3148)
	Receiving objects: 100% (6563/6563), 17.89 MiB | 234 KiB/s, done.
	Resolving deltas: 100% (4485/4485), done.
	Checking out files: 100% (437/437), done.

**cd MoDevMetrics**

**git submodule init**

    Submodule 'html/es/lib/jsImport' (https://github.com/klahnakoski/jsImport.git) registered for path 'html/es/lib/jsImport'
    Submodule 'html/es/lib/jsThreads' (https://github.com/mozilla/jsThreads.git) registered for path 'html/es/lib/jsThreads'

**git submodule update**

    Cloning into 'html/es/lib/jsImport'...
    remote: Counting objects: 17, done.
    remote: Compressing objects: 100% (13/13), done.
    remote: Total 17 (delta 1), reused 14 (delta 1)
    Unpacking objects: 100% (17/17), done.
    Submodule path 'html/es/lib/jsImport': checked out '9496679302367d4c21b86684a69f5eb682e09541'
    Cloning into 'html/es/lib/jsThreads'...
    remote: Counting objects: 43, done.
    remote: Compressing objects: 100% (35/35), done.
    emote: Total 43 (delta 15), reused 31 (delta 6)
    Unpacking objects: 100% (43/43), done.
    Submodule path 'html/es/lib/jsThreads': checked out '0feb4d42a0b3e1583e4e2179e068546850c78487'


Other Notes
-----------
The interesting stuff start in ./html/es

  - [Reference document covering the query format](docs/CUBE.md)
  - [Dimension Definitions](docs/Dimension Definitions.md)