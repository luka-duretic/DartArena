package dartarena.backend.services;

import dartarena.backend.models.SubProfile;

import java.util.*;

public interface SubProfileService {
    SubProfile createSubProfile(Long id, String nickName);
    List<SubProfile> getSubProfiles(Long id);
    Map<String, String> deleteSubProfile(Long id);
}
