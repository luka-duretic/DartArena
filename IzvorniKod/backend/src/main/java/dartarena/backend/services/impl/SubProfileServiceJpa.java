package dartarena.backend.services.impl;

import dartarena.backend.exceptions.InvalidFormatException;
import dartarena.backend.models.SubProfile;
import dartarena.backend.models.User;
import dartarena.backend.repository.SubProfileRepository;
import dartarena.backend.repository.UserRepository;
import dartarena.backend.services.SubProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubProfileServiceJpa implements SubProfileService {
    @Autowired
    private SubProfileRepository subProfileRepo;
    @Autowired
    private UserRepository userRepo;

    @Override
    public SubProfile createSubProfile(Long id, String nickName) {
        User user = userRepo.findById(id).orElseThrow(() -> new InvalidFormatException("User not found"));

        if(subProfileRepo.findByNickName(nickName) != null && subProfileRepo.findByNickName(nickName).getUser().getId() == id)
            throw new InvalidFormatException("Subprofile with nickname " + nickName + " already exists");

        SubProfile subProfile = new SubProfile();
        subProfile.setNickName(nickName);
        subProfile.setUser(user);
        subProfileRepo.save(subProfile);

        return subProfile;
    }

    @Override
    public List<SubProfile> getSubProfiles(Long id) {
        User user = userRepo.findById(id).orElseThrow(() -> new InvalidFormatException("User not found"));

        List<SubProfile> subProfiles = subProfileRepo.findByUser(user);
        if(subProfiles.isEmpty())
            throw new InvalidFormatException("No subprofiles found");

        return subProfiles;
    }

    @Override
    public Map<String, String> deleteSubProfile(Long id) {
        Map<String, String> result = new HashMap<>();
        if(!subProfileRepo.existsById(id))
            result.put("message", "Subprofile with id " + id + " does not exist");

        subProfileRepo.deleteById(id);
        result.put("message", "Subprofile with id " + id + " has been deleted");
        return result;
    }
}
