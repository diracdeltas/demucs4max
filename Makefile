dist:
	mkdir demucs && cp README.md demucs/README.txt && cp demucs.amxd demucs/ && cp *.js demucs/ && zip -r demucs demucs/*
clean:
	rm -r demucs/ && rm *.zip
